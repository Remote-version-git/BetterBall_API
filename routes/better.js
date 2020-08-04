var express = require('express');
var router = express.Router();
// 引入数据库
const db = require('../config')

// 通过openid获取一个用户的最高成绩信息
router.get('/user_score', (req, res, next) => {
    let openid = req.query.openid;
    // sql 语句
    let sql = 'SELECT score FROM t_pinball_score tps LEFT JOIN twechat_userinfo twu ON tps.openid = twu.openid where tps.openid = ?';
    db.query(sql, [openid],(err, data) => {
        if (err) {
            res.json({
                'status': 400,
                'error': err
            })
        } else {
            res.json({
                'status': 200,
                'data': data[0]
            })
        }
    })
})

// 获取前100名排行榜结果
router.get('/tpinball_score', function (req, res, next) {
    let sql = `SELECT twu.nickname nickname, twu.headimgurl avatar, score, rank
            FROM t_pinball_score tps LEFT JOIN twechat_userinfo twu ON tps.openid = twu.openid
             ORDER BY CONVERT(score, SIGNED) desc, create_time ASC limit 0,100`
    db.query(sql, (err, data) => {
        if (err) {
            res.json({
                "status": 400,
                "error": err
            })
        } else {
            res.json({
                "status": 200,
                "data": data
            })
        }
    })
});

// 提交用户分数
router.post('/post_score', (req, res, next) => {
    let openid = req.body.openid;
    let score = req.body.score;
    // sql
    let oldDataSql = `SELECT score FROM t_pinball_score WHERE openid = "${openid}"`
    db.query(oldDataSql, (err, data) => {
        if (err) {
            res.json({
                'status': 400,
                'error': err
            })
        } else {
            if (data.length === 0) {
                // 当该用户没有成绩时 添加成绩
                let addDataSql = `INSERT INTO t_pinball_score SET ?`;
                let data = {
                    openid,
                    score,
                    create_time: new Date()
                }
                db.query(addDataSql, data, (err, data) => {
                    if (err) {
                        res.json({
                            "status": 400,
                            "error": err
                        })
                    } else {
                        res.json({
                            "status": 200,
                            'msg': '添加成绩成功'
                        })
                    }
                })
            } else if (Number(score) > Number(data[0].score)) {
                // 当用户破自己最高成绩时 更新成绩
                let newDataSql = `UPDATE t_pinball_score SET ? WHERE openid = "${openid}"`
                let newData = {
                    score,
                    create_time: new Date()
                }
                db.query(newDataSql, newData, (err, data) => {
                    if (err) {
                        res.json({
                            "status": 400,
                            "error": err
                        })
                    } else {
                        res.json({
                            "status": 200,
                            'msg': '修改成绩成功'
                        })
                    }
                })
            } else {
                res.json({
                    "status": 400,
                    "error": "分数少于原分数"
                })
            }
        }
    })
})

// 提交用户的信息
router.post('/post_user_info', (req, res, next) => {
    // 需要传的参数
    let openid = req.body.openid;
    let nickname = req.body.nickname;
    let sex = req.body.sex;
    let province = req.body.province;
    let city = req.body.city;
    let country = req.body.country;
    let headimgurl = req.body.headimgurl;
    // sql 语句
    let sql = `SELECT openid FROM twechat_userinfo WHERE openid = "${openid}"`
    db.query(sql, (err, data) => {
        if (err) {
            res.json({
                "status": 400,
                "error": err
            })
        } else {
            if (data.length === 0) {
                // 没有这个用户信息 就添加
                let addDataSql = `INSERT INTO twechat_userinfo SET ?`;
                let addData = {
                    openid,
                    nickname,
                    sex,
                    province,
                    city,
                    country,
                    headimgurl,
                    createtime: new Date(),
                    updatetime: new Date()
                }
                db.query(addDataSql, addData, (err, data) => {
                    if (err) {
                        res.json({
                            "status": 400,
                            "error": err
                        })
                    } else {
                        res.json({
                            "status": 200,
                            'msg': '添加用户信息成功'
                        })

                    }
                })
            } else {
                // 否则修改用户信息
                let updateDataSql = `UPDATE twechat_userinfo SET ? WHERE openid = ?`
                let updateData = {
                    nickname,
                    sex,
                    province,
                    city,
                    country,
                    headimgurl,
                    updatetime: new Date()
                }
                db.query(updateDataSql, [updateData, openid], (err, data) => {
                    if (err) {
                        res.json({
                            "code": 400,
                            "error": err
                        })
                    } else {
                        res.json({
                            "code": 200,
                            'msg': '修改用户信息成功'
                        })

                    }
                })
            }
        }
    })
})

module.exports = router;

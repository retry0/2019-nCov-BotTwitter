require('dotenv').config()
process.env.TZ = 'Asia/Jakarta'
const {
    redis_client,
    redisGet
} = require('./utils/redis')

const crc32 = require('./utils/hash')
const cron = require('node-cron')
const covid19_update = require('./wuhan')
const { tweet } = require('./utils/tweet')

function chunkText(text) {
    var array = text.split(' ')
    var i,j,temparray = [],chunk = 20;
    for (i=0,j=array.length; i<j; i+=chunk) {
        temparray.push(array.slice(i,i+chunk));
    }
    return temparray
}

const indonesia = async() => {
    var corona = await covid19_update()
    corona.news.every(async c => {
        var content = c.content
        if(c.title.toLowerCase().includes('indonesia')) {
            var hash_code = crc32(c.title)
            if(await redisGet('news:'+hash_code)) {
                console.log(hash_code+" EXIST")
                return false
            } else {
                // console.log(hash_code)
                var start_tweet = await tweet(c.title).then(start_tweet)
                var latest_id = start_tweet.id_str
                if(content.length > 278) {
                    var chunk = chunkText(content)
                    for (let i = 0; i < chunk.length; i++) {
                        const element = chunk[i];
                        var text = element.join(' ')
                        if(i != chunk.length - 1) {
                            text += ` ~(${i+1}/${chunk.length})`
                        }
                        var child_tweet = await tweet(text, latest_id).then(child_tweet)
                        latest_id = child_tweet.id_str
                    }
                } else if (content.length > 0) {
                    await tweet(content, start_tweet.id_str).then()
                }
                redis_client.setex('news:'+hash_code, 60*24*30, c.title)
            }
        }
    })
    corona.regions_affected.every(async t => {
        if(t.country.toLowerCase().includes('indonesia')) {
            let json_str = JSON.stringify(t)
            var checkExist = await redisGet('indonesia_affected')
            if(!checkExist || checkExist !== json_str) {
                await tweet(`2019-nCov Update for ${t.country}\n\nInfections: ${t.infection}\nActive cases: ${t.active_cases}\nDeaths: ${t.deaths}\nRecovered: ${t.recovered}\n\nUpdated ${new Date().toLocaleString()}`)
                redis_client.set('indonesia_affected', json_str)
            }
        }
    })
}

const malaysia = async() => {
    var corona = await covid19_update()
    corona.news.every(async c => {
        var content = c.content
        if(c.title.toLowerCase().includes('malaysia')) {
            var hash_code = crc32(c.title)
            if(await redisGet('news:'+hash_code)) {
                console.log(hash_code+" EXIST")
                return false
            } else {
                // console.log(hash_code)
                var start_tweet = await tweet(c.title).then(start_tweet)
                var latest_id = start_tweet.id_str
                if(content.length > 278) {
                    var chunk = chunkText(content)
                    for (let i = 0; i < chunk.length; i++) {
                        const element = chunk[i];
                        var text = element.join(' ')
                        if(i != chunk.length - 1) {
                            text += ` ~(${i+1}/${chunk.length})`
                        }
                        var child_tweet = await tweet(text, latest_id).then(child_tweet)
                        latest_id = child_tweet.id_str
                    }
                } else if (content.length > 0) {
                    await tweet(content, start_tweet.id_str).then()
                }
                redis_client.setex('news:'+hash_code, 60*24*30, c.title)
            }
        }
    })
    corona.regions_affected.every(async t => {
        if(t.country.toLowerCase().includes('malaysia')) {
            let json_str = JSON.stringify(t)
            var checkExist = await redisGet('malaysia_affected')
            if(!checkExist || checkExist !== json_str) {
                await tweet(`2019-nCov Update for ${t.country}\n\nInfections: ${t.infection}\nActive cases: ${t.active_cases}\nDeaths: ${t.deaths}\nRecovered: ${t.recovered}\n\nUpdated ${new Date().toLocaleString()}`)
                redis_client.set('malaysia_affected', json_str)
            }
        }
    })
}

const singapore = async() => {
    var corona = await covid19_update()
    corona.news.every(async c => {
        var content = c.content
        if(c.title.toLowerCase().includes('singapore')) {
            var hash_code = crc32(c.title)
            if(await redisGet('news:'+hash_code)) {
                console.log(hash_code+" EXIST")
                return false
            } else {
                // console.log(hash_code)
                var start_tweet = await tweet(c.title).then(start_tweet)
                var latest_id = start_tweet.id_str
                if(content.length > 278) {
                    var chunk = chunkText(content)
                    for (let i = 0; i < chunk.length; i++) {
                        const element = chunk[i];
                        var text = element.join(' ')
                        if(i != chunk.length - 1) {
                            text += ` ~(${i+1}/${chunk.length})`
                        }
                        var child_tweet = await tweet(text, latest_id).then(child_tweet)
                        latest_id = child_tweet.id_str
                    }
                } else if (content.length > 0) {
                    await tweet(content, start_tweet.id_str).then()
                }
                redis_client.setex('news:'+hash_code, 60*24*30, c.title)
            }
        }
    })
    corona.regions_affected.every(async t => {
        if(t.country.toLowerCase().includes('singapore')) {
            let json_str = JSON.stringify(t)
            var checkExist = await redisGet('singapore_affected')
            if(!checkExist || checkExist !== json_str) {
                await tweet(`2019-nCov Update for ${t.country}\n\nInfections: ${t.infection}\nActive cases: ${t.active_cases}\nDeaths: ${t.deaths}\nRecovered: ${t.recovered}\n\nUpdated ${new Date().toLocaleString()}`)
                redis_client.set('singapore_affected', json_str)
            }
        }
    })
}

const world = async() => {
    var corona = await covid19_update()
    corona.news.every(async c => {
        var content = c.content
        if(c.title.toLowerCase().includes('total')) {
            var hash_code = crc32(c.title)
            if(await redisGet('news:'+hash_code)) {
                console.log(hash_code+" EXIST")
                return false
            } else {
                // console.log(hash_code)
                var start_tweet = await tweet(c.title).then(start_tweet)
                var latest_id = start_tweet.id_str
                if(content.length > 278) {
                    var chunk = chunkText(content)
                    for (let i = 0; i < chunk.length; i++) {
                        const element = chunk[i];
                        var text = element.join(' ')
                        if(i != chunk.length - 1) {
                            text += ` ~(${i+1}/${chunk.length})`
                        }
                        var child_tweet = await tweet(text, latest_id).then(child_tweet)
                        latest_id = child_tweet.id_str
                    }
                } else if (content.length > 0) {
                    await tweet(content, start_tweet.id_str).then()
                }
                redis_client.setex('news:'+hash_code, 60*24*30, c.title)
            }
        }
    })
    corona.total_affected.every(async t => {
        if(t.country.toLowerCase().includes('total')) {
            let json_str = JSON.stringify(t)
            var checkExist = await redisGet('total_ffected')
            if(!checkExist || checkExist !== json_str) {
                await tweet(`2019-nCov Update for ${t.country}\n\nInfections: ${t.infection}\nActive cases: ${t.active_cases}\nDeaths: ${t.deaths}\nRecovered: ${t.recovered}\n\nUpdated ${new Date().toLocaleString()}`)
                redis_client.set('total_ffected', json_str)
            }
        }
    })
}


cron.schedule("0 0 */23 * * *", () => {
    console.log('running a task every 23 hours');
    console.log("START")
    world()
    indonesia()
    singapore()
    malaysia()
})

console.log("Service is running, press CTRL+C to stop.")

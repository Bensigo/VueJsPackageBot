const twit = require('twit');
require('dotenv').config();

//config
const config = require('./config')



//making instance of twiter an passing the config
const Twitter = new twit(config);

//retweet bot function
const retweet = (query) => {
    //parameter of recent tweet with hastag to search for 
    const parms = {
        q: query,
        result_type: 'recent',
        lang: 'en'
    }
    //search for all tweet with the params variable 
    Twitter.get('search/tweets', parms, ( err, data) => {
        if(!err){
            //grap the id of tweet
            try{
                console.log(data)
                const tweetId = data.statuses[0].id_str
                console.log(tweetId)
                //retwet the tweet with the id
                Twitter.post('statuses/retweet/:id', { id: tweetId}, (err, res) => {
                    if(err) {
                        console.log('failed to retweet tweet ')
                    }
                    console.log('retweeted successfully');
                })
            }
            catch(err) {
                console.log('failed to search for query')
            }
            
        }else{
            console.log('failed to search for tweet')
        }
    })

}



//favorite tweet bot 
const faoriteTweet = (query) => {
    const parms = {
        q: query,
        result_type: 'recent',
        lang: 'en'
    }
    //search tweet and favorite tweet
    Twitter.get('/search/tweets', parms, (err, data) => {
        try{
            if(!err) {
                const tweets = data.statuses
                //select a random tweet
                const randomTweet = random(tweets);
                //check if radom tweet exist 
                if (typeof randomTweet !== 'undefined'){
                    //then favorite the random tweet
                    Twitter.post('favorites/create', {id: randomTweet.id_str},(err, res) => {
                        if (err) {
                            console.log('cannot favorite tweet')
                        }else{
                            console.log('tweet favourited')
                        }
                    })
                }

            }
        }catch(err){
            console.log('error while trying to  favoriting tweet')
        }
            
    })
} 


const random = (arr) => {
  const index = Math.floor(Math.random()* arr.length) 
  return arr[index] 
}

console.log('starting twitter bot .....')
const queryBot = () => {
    query = ['#vuejs', '#VuePackage']
    for(var i = 0; i < query.length; i++){
       retweet(query[i]);
       faoriteTweet(query[i]);
    }
    console.log('waiting cor next 30 mins')
}
// retweet()
queryBot()
//retweet fuctionality rus every 30mins 
setInterval(queryBot, 1800000);




// expose config directly to app using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '504059593297824', // your App ID
        'clientSecret'  : '3c3afd12dac8b809604d7996ca46ccdd', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'emails', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'sz1Er3xSSYyCDQqtAKrXLLxjG',
        'consumerSecret'    : 'bh43kikWd0FKmaNPP6wJI9HAwK34IBaqz1xu9ShSymA5HVrBeG',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '139413733672-fs9led8homjuhqgm1tnnh0e58rd0eejq.apps.googleusercontent.com',
        'clientSecret'  : 'uUsx9q01mDGd4wI9gPKeOdMe',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
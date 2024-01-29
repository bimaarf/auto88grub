class Tweet {
  final int userId;
  final int id;
  final String text;

  Tweet({required this.userId, required this.id, required this.text});

  factory Tweet.fromJson(Map<String, dynamic> json) {
    return Tweet(
      userId: json['user_id'],
      id: json['id'],
      text: json['text'],
    );
  }
}

// class Tweets {
//   int? id;
//   String? username;
//   String? tweets;

//   Tweets({this.id, this.username, this.tweets});

//   Tweets.fromJson(Map<String, dynamic> json) {
//     id = json['id'];
//     username = json['username'];
//     tweets = json['tweets'];
//   }
// }


// class Tweets {
//   final int id;
//   final String username;
//   final String tweets;

//   Tweets({required this.id, required this.username, required this.tweets});

//   factory Tweets.fromJson(Map<String, dynamic> json) {
//     return Tweets(
//       id: json['data']['id'],
//       username: json['data']['username'],
//       tweets: json['data']['tweets'],
//     );
//   }
// }

class Tweets {
  final int id;
  final String username;
  final String tweets;

  Tweets({required this.id, required this.username, required this.tweets});

  factory Tweets.fromJson(Map<String, dynamic> json) {
    return Tweets(
      id: json['data']['id'],
      username: json['data']['username'],
      tweets: json['data']['tweets'],
    );
  }
}

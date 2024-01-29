import 'dart:convert';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:http/http.dart' as http;

Future<List<Tweet>> fetchTweets() async {
  final response = await http.get(
    Uri.parse('https://api.twitter.com/1.1/statuses/home_timeline.json'),
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
  );

  if (response.statusCode == 200) {
    final tweetsJson = jsonDecode(response.body);
    return tweetsJson.map<Tweet>((json) => Tweet.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load tweets');
  }
}

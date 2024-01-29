import 'dart:convert';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:http/http.dart' as http;

class ApiService {
  Future<List<Tweets>> fetchTweets() async {
    final response = await http
        .get(Uri.parse('http://bimarf.in/api/tweets?page=1&perPage=10'));

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      final List<dynamic> data = jsonData['data'];

      final List<Tweets> tweets =
          data.map((json) => Tweets.fromJson(json)).toList();
      print(tweets);
      return tweets;
    } else {
      throw Exception(
          'Failed to load tweets. Status code: ${response.statusCode}');
    }
  }
}

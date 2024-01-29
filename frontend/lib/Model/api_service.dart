import 'dart:convert';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://bimarf.in/api/tweets';
  static const String usersEndpoint = '?page=1&perPage=10';

  Future<List<Tweets>> fetchTweets() async {
    final response = await http.get(Uri.parse('$baseUrl$usersEndpoint'));

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      final List<dynamic> data = jsonData['data'];
      final List<Tweets> tweets =
          data.map((json) => Tweets.fromJson(json)).toList();
      return tweets;
    } else {
      throw Exception('Failed to load tweets');
    }
  }
}

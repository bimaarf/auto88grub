import 'dart:convert';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:http/http.dart' as http;

class ApiService {
  Future<List<Tweet>> fetchTweets() async {
    final response = await http
        .get(Uri.parse('http://bimarf.in/api/tweets?page=1&perPage=10'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((tweet) => Tweet.fromJson(tweet)).toList();
    } else {
      throw Exception('Failed to load tweets');
    }
  }
}

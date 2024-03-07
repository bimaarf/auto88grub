import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ServiceQuestion {
  static Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  static Future<List<Map<String, dynamic>>> fetchQuestion(
      String baseUrl) async {
    final String token = await getTokenFromStorage();
    final url = Uri.parse('$baseUrl/api/question/view');

    try {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $token'},
      );

      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);
        final List<dynamic> data = jsonData['data'];

        if (data.isEmpty) {
          return []; // Return an empty list if there's no data
        }

        return List<Map<String, dynamic>>.from(
            data.map((item) => item as Map<String, dynamic>));
      } else {
        throw Exception('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to load data: $e');
    }
  }
}

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ServiceBrankas {
  static Future<String> getTokenFromStorage() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    return pref.getString('token') ?? '';
  }

  static Future<List<Map<String, dynamic>>> fetchBrankas() async {
    final String token = await getTokenFromStorage();
    final String baseUrl = dotenv.env['BASE_URL'] ?? '';
    final url = Uri.parse('$baseUrl/api/brankas/view');

    if (token.isNotEmpty) {
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
        throw Exception('Failed to load data');
      }
    } else {
      throw Exception('Token not found');
    }
  }
}

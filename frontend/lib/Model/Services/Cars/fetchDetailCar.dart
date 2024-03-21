import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ServiceDetailCar {
  static Future<String> getTokenFromStorage() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    return pref.getString('token') ?? '';
  }

  static Future<Map<String, dynamic>> fetchCarDetail(carId, slug) async {
    final String token = await getTokenFromStorage();
    final String baseUrl = dotenv.env['BASE_URL'] ?? '';
    final url = Uri.parse('$baseUrl/api/car/preview/$slug/$carId');

    if (token.isNotEmpty) {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $token'},
      );

      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);
        return jsonData['data'];
      } else {
        throw Exception('Failed to load data');
      }
    } else {
      throw Exception('Token not found');
    }
  }
}

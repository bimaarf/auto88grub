import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateSeriesPage extends StatefulWidget {
  final String seriesId;
  final String name;
  final Function() onUpdate;
  final Function() fetchNewData;

  UpdateSeriesPage({
    required this.seriesId,
    required this.name,
    required this.onUpdate,
    required this.fetchNewData,
  });

  @override
  _UpdateSeriesPageState createState() => _UpdateSeriesPageState();
}

class _UpdateSeriesPageState extends State<UpdateSeriesPage> {
  TextEditingController _nameController = TextEditingController();
  String _token = '';
  bool _isLoading = false;
  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _loadToken();
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> updateSeries() async {
    setState(() {
      _isLoading = true;
    });
    try {
      String baseUrl = dotenv.env['BASE_URL']!;
      String token = 'Bearer $_token'; // Add your token retrieval logic here

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': _nameController.text,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/series/update/${widget.seriesId}'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Series updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Series updated err'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update Series: ${response.statusCode}');
      }
    } catch (e) {
      // Error updating Series
      print('Error updating Series: $e');
    } finally {
      setState(() {
        _isLoading:
        false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Update Series'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : updateSeries,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}

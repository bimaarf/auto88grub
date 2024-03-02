import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateCoordinatePage extends StatefulWidget {
  final String coordinateId;
  final String name;
  final String latitude;
  final String longitude;
  final bool isUnlimited;
  final int limitation;
  final bool isVisible;
  final Function() onUpdate;
  final Function() fetchNewData; // Function to fetch new data

  UpdateCoordinatePage({
    required this.coordinateId,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.isUnlimited,
    required this.limitation,
    required this.isVisible,
    required this.onUpdate,
    required this.fetchNewData, // Pass function as a parameter
  });

  @override
  _UpdateCoordinatePageState createState() => _UpdateCoordinatePageState();
}

class _UpdateCoordinatePageState extends State<UpdateCoordinatePage> {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _latitudeController = TextEditingController();
  TextEditingController _longitudeController = TextEditingController();
  TextEditingController _limitationController = TextEditingController();
  late bool _isUnlimited;
  late bool _isVisible;
  String _token = '';
  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _latitudeController.text = widget.latitude;
    _longitudeController.text = widget.longitude;
    _limitationController.text = widget.limitation.toString();
    _isUnlimited = widget.isUnlimited;
    _isVisible = widget.isVisible;
    _loadToken();
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> updateCoordinate() async {
    try {
      String baseUrl = dotenv.env['BASE_URL']!;
      String token = 'Bearer $_token'; // Add your token retrieval logic here

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': _nameController.text,
        'latitude': double.parse(_latitudeController.text),
        'longitude': double.parse(_longitudeController.text),
        'is_unlimited': _isUnlimited,
        'limitation': int.parse(_limitationController.text),
        'is_visible': _isVisible,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/coordinate/update/${widget.coordinateId}'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Coordinate updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );

        // Call the function to fetch new data

        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Coordinate updated err'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update coordinate: ${response.statusCode}');
      }
    } catch (e) {
      // Error updating coordinate
      print('Error updating coordinate: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Update Coordinate'),
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
            TextFormField(
              controller: _latitudeController,
              decoration: const InputDecoration(labelText: 'Latitude'),
            ),
            TextFormField(
              controller: _longitudeController,
              decoration: const InputDecoration(labelText: 'Longitude'),
            ),
            TextFormField(
              controller: _limitationController,
              decoration: const InputDecoration(labelText: 'Limitation'),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                const Text('Is Unlimited:'),
                Checkbox(
                  value: _isUnlimited,
                  onChanged: (value) {
                    setState(() {
                      _isUnlimited = value!;
                    });
                  },
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Text('Is Visible:'),
                Checkbox(
                  value: _isVisible,
                  onChanged: (value) {
                    setState(() {
                      _isVisible = value!;
                    });
                  },
                ),
              ],
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Call the updateCoordinate function when the button is pressed
                updateCoordinate();
              },
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() {
  runApp(MaterialApp(
    home: CoordinatePage(),
  ));
}

class CoordinatePage extends StatefulWidget {
  @override
  _CoordinatePageState createState() => _CoordinatePageState();
}

class _CoordinatePageState extends State<CoordinatePage> {
  List<Map<String, dynamic>> coordinates = [];
  bool isLoading = false;
  late String baseUrl;

  // Variable state untuk menyimpan nilai radio button
  bool? isUnlimited;
  bool? isVisible;

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    fetchCoordinate();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchCoordinate() async {
    try {
      setState(() {
        isLoading = true;
      });

      String token = await getTokenFromStorage();

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
      };

      final response = await http.get(
        Uri.parse('$baseUrl/api/coordinate/view'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        final dynamic responseData = json.decode(response.body);

        if (responseData['data'] is List<dynamic>) {
          setState(() {
            coordinates = List<Map<String, dynamic>>.from(responseData['data']);
            isLoading = false;
          });
        } else {
          throw Exception('Invalid response data format');
        }
      } else {
        throw Exception(
            'Failed to load coordinate data: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching coordinate data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Coordinates'),
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchCoordinate,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : coordinateList(),
      ),
    );
  }

  Widget coordinateList() {
    return ListView.builder(
      itemCount: coordinates.length,
      itemBuilder: (context, index) {
        final coordinate = coordinates[index];
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.white10))),
          child: ListTile(
            title: Text(
              coordinate['name'].toUpperCase(),
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
            ),
            subtitle: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Latitude: ${coordinate['latitude']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                    Text(
                      'Longitude: ${coordinate['longitude']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Is Unlimited: ${coordinate['is_unlimited']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                    Text(
                      'Limitation: ${coordinate['limitation']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                    Text(
                      'Is Visible: ${coordinate['is_visible']}',
                      style:
                          const TextStyle(fontSize: 12, color: Colors.white70),
                    ),
                  ],
                ),
              ],
            ),
            onTap: () {
              showUpdateModal(coordinate);
            },
          ),
        );
      },
    );
  }

  void showUpdateModal(Map<String, dynamic> coordinate) async {
    final TextEditingController nameController =
        TextEditingController(text: coordinate['name'] ?? '');
    final TextEditingController latitudeController =
        TextEditingController(text: coordinate['latitude']?.toString() ?? '');
    final TextEditingController longitudeController =
        TextEditingController(text: coordinate['longitude']?.toString() ?? '');
    final TextEditingController limitationController =
        TextEditingController(text: coordinate['limitation']?.toString() ?? '');

    // Inisialisasi nilai default radio button
    isUnlimited = coordinate['is_unlimited'];
    isVisible = coordinate['is_visible'];

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return Dialog(
              insetPadding: EdgeInsets.zero,
              child: IntrinsicWidth(
                child: Container(
                  width: double.maxFinite,
                  margin: const EdgeInsets.all(20),
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        TextFormField(
                          controller: nameController,
                          decoration: const InputDecoration(labelText: 'Name'),
                        ),
                        TextFormField(
                          controller: latitudeController,
                          decoration:
                              const InputDecoration(labelText: 'Latitude'),
                        ),
                        TextFormField(
                          controller: longitudeController,
                          decoration:
                              const InputDecoration(labelText: 'Longitude'),
                        ),
                        Row(
                          children: [
                            const Text('Is Unlimited:'),
                            Radio<bool>(
                              value: true,
                              groupValue: isUnlimited,
                              onChanged: (value) {
                                setState(() {
                                  isUnlimited = value;
                                });
                              },
                            ),
                            const Text('True'),
                            Radio<bool>(
                              value: false,
                              groupValue: isUnlimited,
                              onChanged: (value) {
                                setState(() {
                                  isUnlimited = value;
                                });
                              },
                            ),
                            const Text('False'),
                          ],
                        ),
                        TextFormField(
                          keyboardType: TextInputType.number,
                          controller: limitationController,
                          decoration:
                              const InputDecoration(labelText: 'Limitation'),
                        ),
                        Row(
                          children: [
                            const Text('Is Visible:'),
                            Radio<bool>(
                              value: true,
                              groupValue: isVisible,
                              onChanged: (value) {
                                setState(() {
                                  isVisible = value;
                                });
                              },
                            ),
                            const Text('True'),
                            Radio<bool>(
                              value: false,
                              groupValue: isVisible,
                              onChanged: (value) {
                                setState(() {
                                  isVisible = value;
                                });
                              },
                            ),
                            Text('False'),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text('Cancel'),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                updateCoordinate(
                                  coordinate['id']?.toString() ?? '',
                                  nameController.text,
                                  latitudeController.text,
                                  longitudeController.text,
                                  isUnlimited ?? false,
                                  int.parse(limitationController.text),
                                  isVisible ?? true,
                                );
                                Navigator.of(context).pop();
                              },
                              child: const Text('Update'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  void updateCoordinate(
    String coordinateId,
    String name,
    String latitude,
    String longitude,
    bool isUnlimited,
    int limitation,
    bool isVisible,
  ) async {
    try {
      String token = await getTokenFromStorage();

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': name,
        'latitude': latitude,
        'longitude': longitude,
        'is_unlimited': isUnlimited,
        'limitation': limitation.toString(),
        'is_visible': isVisible,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/coordinate/update/$coordinateId'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        print('Coordinate updated successfully');
        fetchCoordinate(); // Refresh coordinates after update
      } else {
        print('Failed to update coordinate: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating coordinate: $e');
    }
  }
}

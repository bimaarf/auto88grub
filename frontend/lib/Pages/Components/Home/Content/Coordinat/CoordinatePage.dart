import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchCoordinate.dart';
import 'package:frontend/Pages/Components/Home/Content/Coordinat/CoordinateList.dart';
import 'package:frontend/Pages/Components/Home/Content/Coordinat/CoordinateStore.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class CoordinatePage extends StatefulWidget {
  @override
  _CoordinatePageState createState() => _CoordinatePageState();
}

class _CoordinatePageState extends State<CoordinatePage> {
  List<Map<String, dynamic>> coordinates = [];
  bool isLoading = false;
  late String baseUrl;

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    fetchCoordinate();
    dotenv.load().then((_) {
      baseUrl = dotenv.env['BASE_URL']!;
    });
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

      coordinates = await ServiceCoordinate.fetchCoordinates(baseUrl);

      setState(() {
        isLoading = false;
      });
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
        backgroundColor: Colors.black,
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
            : CoordinateList(
                coordinates: coordinates,
                onUpdate: (coordinate) {
                  showUpdateModal(coordinate);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddCoordinatePage(),
            ),
          ).then((value) {
            if (value == true) {
              // Refresh coordinate list if a coordinate was added successfully
              fetchCoordinate();
            }
          });
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
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

    bool? isUnlimited = coordinate['is_unlimited'];
    bool? isVisible = coordinate['is_visible'];

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
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Coordinate updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        fetchCoordinate();
      } else {
        print('Failed to update coordinate: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating coordinate: $e');
    }
  }
}

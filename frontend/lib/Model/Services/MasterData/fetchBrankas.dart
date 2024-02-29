import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ServiceBrankas {
  static Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  static Future<List<Map<String, dynamic>>> fetchBrankas(String baseUrl) async {
    final String token = await getTokenFromStorage();
    final url = Uri.parse('$baseUrl/api/brankas/view');

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

class BrankasList extends StatefulWidget {
  const BrankasList({Key? key}) : super(key: key);

  @override
  _BrankasListState createState() => _BrankasListState();
}

class _BrankasListState extends State<BrankasList> {
  List<Map<String, dynamic>> _networkData =
      []; // Utilize _networkData to store fetched data
  bool _isLoading = true; // Utilize _isLoading to indicate loading state
  TextEditingController _nameController = TextEditingController();

  late String baseUrl; // Declare baseUrl variable

  @override
  void initState() {
    super.initState();
    dotenv.load().then((_) {
      baseUrl = dotenv.env['BASE_URL']!;
      _fetchData();
    }); // Load baseUrl from environment
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _fetchData() async {
    setState(() {
      _isLoading = true; // Set loading state to true
    });

    try {
      final List<Map<String, dynamic>> responseData =
          await ServiceBrankas.fetchBrankas(
              baseUrl); // Pass baseUrl to the service method

      setState(() {
        _networkData = responseData; // Store fetched data in _networkData
        _isLoading = false; // Set loading state to false when data is loaded
      });
    } catch (e) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content:
                Text("Failed to fetch data. Please try again later. Error: $e"),
            actions: <Widget>[
              TextButton(
                child: const Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );

      setState(() {
        _isLoading = false; // Set loading state to false when error occurs
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _fetchData,
              child: _networkData.isEmpty
                  ? Center(
                      child: Text(
                        'No data available',
                        style: TextStyle(fontSize: 18),
                      ),
                    )
                  : ListView.builder(
                      itemCount: _networkData.length,
                      itemBuilder: (context, index) {
                        final network = _networkData[index];
                        final name = network['name'] as String? ?? '';
                        final updatedAt =
                            network['created_at'] as String? ?? '';

                        return Container(
                          margin: EdgeInsets.symmetric(horizontal: 3),
                          decoration: BoxDecoration(
                            border:
                                Border(bottom: BorderSide(color: Colors.white)),
                          ),
                          child: ListTile(
                            title: Text(
                              name.toUpperCase(),
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 15),
                            ),
                            subtitle: Text(updatedAt),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  icon: Icon(Icons.edit),
                                  onPressed: () {
                                    _showUpdateModal(context, network);
                                  },
                                ),
                                IconButton(
                                  icon: Icon(Icons.delete),
                                  onPressed: () {
                                    _deleteData(network);
                                  },
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
    );
  }

  void _showUpdateModal(BuildContext context, Map<String, dynamic> data) {
    _nameController.text = data['name'] ?? '';

    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Center(
          // Center the modal vertically
          child: Container(
            padding: EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  'Update Data',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _nameController,
                  decoration: InputDecoration(labelText: 'Name'),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    _updateData(context, data); // Pass context as a parameter
                    Navigator.pop(context);
                  },
                  child: const Text('Update'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _updateData(
      BuildContext parentContext, Map<String, dynamic> data) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? token = prefs.getString('token');

      if (token != null) {
        String updatedName = _nameController.text;
        Map<String, dynamic> updatedData = {
          'name': updatedName,
        };

        String requestBody = jsonEncode(updatedData);

        final response = await http.patch(
          Uri.parse('$baseUrl/api/brankas/update/${data['id']}'),
          headers: <String, String>{
            'Authorization': 'Bearer $token',
          },
          body: requestBody,
        );

        if (response.statusCode == 200) {
          _fetchData();
          print('success update');
        } else {
          showDialog(
            context: parentContext, // Use parentContext instead of context
            builder: (BuildContext context) {
              print('err update data = ${updatedData} ${data['id']}');
              return AlertDialog(
                title: const Text("Error"),
                content: const Text(
                    "Failed to update data. Please try again later."),
                actions: <Widget>[
                  TextButton(
                    child: const Text("OK"),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              );
            },
          );
        }
      }
    } catch (e) {
      // Handle error
      print('Error: $e');
      showDialog(
        context: parentContext, // Use parentContext instead of context
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content: const Text("An error occurred while updating data."),
            actions: <Widget>[
              TextButton(
                child: const Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }
  }

  void _deleteData(Map<String, dynamic> data) {
    // Implement logic to delete data
  }
}

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchBrankas.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class CoordinatList extends StatefulWidget {
  const CoordinatList({Key? key}) : super(key: key);

  @override
  _CoordinatListState createState() => _CoordinatListState();
}

class _CoordinatListState extends State<CoordinatList> {
  List<Map<String, dynamic>> _networkData = [];
  bool _isLoading = true;
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
      _isLoading = true;
    });

    try {
      final List<Map<String, dynamic>> responseData =
          await ServiceBrankas.fetchBrankas(
              baseUrl); // Pass baseUrl to the service method

      setState(() {
        _networkData = responseData;
        _isLoading = false;
      });
    } catch (e) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content:
                const Text("Failed to fetch data. Please try again later."),
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
        _isLoading = false;
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
              child:
                  _buildCoordinatList(), // Use centralized list building method
            ),
    );
  }

  Widget _buildCoordinatList() {
    if (_networkData.isEmpty) {
      return const Center(
        child: Text(
          'No data available',
          style: TextStyle(fontSize: 18),
        ),
      );
    }

    return ListView.builder(
      itemCount: _networkData.length,
      itemBuilder: (context, index) {
        final network = _networkData[index];
        final name = network['name'] as String? ?? '';
        final updatedAt = network['created_at'] as String? ?? '';

        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.white))),
          child: ListTile(
            title: Text(
              name.toUpperCase(),
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
            ),
            subtitle: Text(updatedAt),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () {
                    _showUpdateModal(context, network);
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () {
                    _deleteData(network);
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _showUpdateModal(BuildContext context, Map<String, dynamic> data) {
    _nameController.text = data['name'] ?? '';

    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          padding: const EdgeInsets.all(16),
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
                decoration: const InputDecoration(labelText: 'Name'),
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
        );
      },
    );
  }

  void _updateData(BuildContext context, Map<String, dynamic> data) async {
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
          Uri.parse(
              '$baseUrl/api/brankas/update/${data['id']}'), // Use baseUrl from environment
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
            context: context,
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
        context: context,
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

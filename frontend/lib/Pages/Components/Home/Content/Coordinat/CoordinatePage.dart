import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class ServiceCoordinate {
  static Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  static Future<List<Map<String, dynamic>>> fetchCoordinates(
      String baseUrl) async {
    final String token = await getTokenFromStorage();
    final url = Uri.parse('$baseUrl/api/coordinate/view');

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

class CoordinatePage extends StatefulWidget {
  const CoordinatePage();

  @override
  State<CoordinatePage> createState() => _CoordinatePageState();
}

class _CoordinatePageState extends State<CoordinatePage> {
  late String _token;
  late bool _isLoading;
  late List<Map<String, dynamic>> _coordinates;

  @override
  void initState() {
    super.initState();
    _isLoading = false;
    _coordinates = [];
    _loadUserData();
    _fetchCoordinates();
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> _fetchCoordinates() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final baseUrl = dotenv.env['BASE_URL'];
      final fetchedCoordinates = await ServiceCoordinate.fetchCoordinates(
          baseUrl!); // Use your service to fetch data
      setState(() {
        _coordinates = fetchedCoordinates;
        _isLoading = false;
      });
    } catch (e) {
      print('Error fetching coordinates: $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _showUpdateModal(Map<String, dynamic> coordinate) {
    final TextEditingController nameController =
        TextEditingController(text: coordinate['name'] ?? '');
    final TextEditingController latitudeController =
        TextEditingController(text: coordinate['latitude']?.toString() ?? '');
    final TextEditingController longitudeController =
        TextEditingController(text: coordinate['longitude']?.toString() ?? '');
    final TextEditingController isUnlimitedController = TextEditingController(
        text: coordinate['is_unlimited']?.toString() ?? '');
    final TextEditingController limitationController =
        TextEditingController(text: coordinate['limitation']?.toString() ?? '');
    final TextEditingController isVisibleController =
        TextEditingController(text: coordinate['is_visible']?.toString() ?? '');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true, // Set modal agar dapat di-scroll
      builder: (BuildContext context) {
        return SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
              left: 16.0,
              right: 16.0,
            ),
            child: Container(
              padding: EdgeInsets.all(16.0),
              child: Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Text('Update Coordinate',
                        style: TextStyle(
                            fontSize: 20.0, fontWeight: FontWeight.bold)),
                    SizedBox(height: 20.0),
                    TextField(
                      controller: nameController,
                      decoration: InputDecoration(labelText: 'Name'),
                    ),
                    TextField(
                      controller: latitudeController,
                      decoration: InputDecoration(labelText: 'Latitude'),
                    ),
                    TextField(
                      controller: longitudeController,
                      decoration: InputDecoration(labelText: 'Longitude'),
                    ),
                    TextField(
                      controller: isUnlimitedController,
                      decoration: InputDecoration(labelText: 'Is Unlimited'),
                    ),
                    TextField(
                      controller: limitationController,
                      decoration: InputDecoration(labelText: 'Limitation'),
                    ),
                    TextField(
                      controller: isVisibleController,
                      decoration: InputDecoration(labelText: 'Is Visible'),
                    ),
                    SizedBox(height: 20.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        ElevatedButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: Text('Cancel'),
                        ),
                        SizedBox(width: 10.0),
                        ElevatedButton(
                          onPressed: () {
                            // Panggil fungsi untuk melakukan pembaruan koordinat
                            _updateCoordinate(coordinate);
                            Navigator.of(context).pop();
                          },
                          child: Text('Update'),
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
  }

  void _updateCoordinate(Map<String, dynamic> coordinate) async {
    try {
      final baseUrl = dotenv.env['BASE_URL'];
      final String coordinateId = coordinate['id'].toString();

      Map<String, dynamic> updateData = {
        'name': coordinate['name'],
        'latitude': coordinate['latitude'],
        'longitude': coordinate['longitude'],
        'is_unlimited': coordinate['is_unlimited'],
        'limitation': coordinate['limitation'],
        'is_visible': coordinate['is_visible'],
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/coordinate/update/$coordinateId'),
        headers: {
          'Authorization': 'Bearer $_token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(updateData),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('User updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );

        _fetchCoordinates();
      } else {
        print('Failed to update coordinate: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating coordinate: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Coordinates')),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _coordinates.length,
              itemBuilder: (context, index) {
                final coordinate = _coordinates[index];
                return ListTile(
                  title: Text(coordinate['name'] ?? ''),
                  subtitle: Text(
                    'Lat: ${coordinate['latitude'] ?? ''}, Long: ${coordinate['longitude'] ?? ''}',
                  ),
                  onTap: () => _showUpdateModal(coordinate),
                );
              },
            ),
    );
  }
}

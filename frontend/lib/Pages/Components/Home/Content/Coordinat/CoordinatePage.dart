import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/MasterData/fetchCoordinate.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart'; // Import package dotenv

class CoordinatePage extends StatefulWidget {
  const CoordinatePage();

  @override
  State<CoordinatePage> createState() => _CoordinatePageState();
}

class _CoordinatePageState extends State<CoordinatePage> {
  late String token;
  late String email;
  late String username;
  late String roles;
  bool isLoading = false;
  List<Map<String, dynamic>> coordinates = [];

  @override
  void initState() {
    super.initState();
    loadUserData();
    fetchCoordinates();
  }

  Future<void> loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      token = prefs.getString('token') ?? '';
      email = prefs.getString('email') ?? '';
      username = prefs.getString('name') ?? '';
      roles = prefs.getString('roles') ?? '';
    });
  }

  Future<void> fetchCoordinates() async {
    setState(() {
      isLoading = true;
    });

    try {
      String baseUrl = dotenv.env['BASE_URL'] ?? '';

      final fetchedCoordinates =
          await ServiceCoordinate.fetchCoordinates(baseUrl);
      setState(() {
        coordinates = fetchedCoordinates;
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching coordinates: $e');
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
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              // Tambahkan logika untuk menampilkan notifikasi jika diperlukan
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
            onPressed: () {
              // Tambahkan logika untuk menampilkan pengaturan jika diperlukan
            },
          ),
        ],
      ),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: MediaQuery.of(context).size.height,
                    child: ListView.builder(
                      itemCount: coordinates.length,
                      itemBuilder: (context, index) {
                        final coordinate = coordinates[index];
                        return ListTile(
                          title: Text(coordinate['name'] ?? ''),
                          subtitle: Text(
                            'Lat: ${coordinate['latitude'] ?? ''}, Long: ${coordinate['longitude'] ?? ''}',
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}

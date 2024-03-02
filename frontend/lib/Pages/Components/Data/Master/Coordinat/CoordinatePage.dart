import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchCoordinate.dart';
import 'package:frontend/Pages/Components/Home/Content/Coordinat/Context/__CoordinateList.dart';
import 'package:frontend/Pages/Components/Home/Content/Coordinat/Context/__CoordinateStore.dart';
import 'package:frontend/Pages/Components/Home/Content/Coordinat/Context/_CoordinateUpdate.dart';
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
    await fetchCoordinate(); // Await fetchCoordinate
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

  void showUpdatePage(Map<String, dynamic> coordinate) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateCoordinatePage(
          coordinateId: coordinate['id']?.toString() ?? '',
          name: coordinate['name'] ?? '',
          latitude: coordinate['latitude']?.toString() ?? '',
          longitude: coordinate['longitude']?.toString() ?? '',
          isUnlimited: coordinate['is_unlimited'] ?? false,
          limitation: coordinate['limitation'] ?? 0,
          isVisible: coordinate['is_visible'] ?? false,
          onUpdate: () {
            fetchCoordinate();
          },
          fetchNewData: fetchCoordinate,
        ),
      ),
    );
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
                  showUpdatePage(coordinate);
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
              fetchCoordinate();
            }
          });
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

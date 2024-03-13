import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchCylinder.dart';
import 'package:frontend/Pages/Components/Data/Master/Cylinder/Context/__CylinderList.dart';
import 'package:frontend/Pages/Components/Data/Master/Cylinder/Context/__CylinderStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Cylinder/Context/__CylinderUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CylinderPage extends StatefulWidget {
  @override
  _CylinderPageState createState() => _CylinderPageState();
}

class _CylinderPageState extends State<CylinderPage> {
  List<Map<String, dynamic>> cylinders = [];
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
    await fetchCylinder(); // Await fetchCylinder
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchCylinder() async {
    try {
      setState(() {
        isLoading = true;
      });

      cylinders = await ServiceCylinder.fetchCylinder(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching cylinder data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> cylinder) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateCylinderPage(
          cylinderId: cylinder['id']?.toString() ?? '',
          volume: cylinder['volume'] ?? '',
          onUpdate: () {
            fetchCylinder();
          },
          fetchNewData: fetchCylinder,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cylinder'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchCylinder,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : CylinderList(
                cylinders: cylinders,
                onUpdate: (cylinder) {
                  showUpdatePage(cylinder);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddCylinderPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchCylinder();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

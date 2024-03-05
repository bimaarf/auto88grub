import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchGear.dart';
import 'package:frontend/Pages/Components/Data/Master/Gear/Context/__GearList.dart';
import 'package:frontend/Pages/Components/Data/Master/Gear/Context/__GearStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Gear/Context/__GearUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GearPage extends StatefulWidget {
  @override
  _GearPageState createState() => _GearPageState();
}

class _GearPageState extends State<GearPage> {
  List<Map<String, dynamic>> gears = [];
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
    await fetchGear(); // Await fetchGear
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchGear() async {
    try {
      setState(() {
        isLoading = true;
      });

      gears = await ServiceGear.fetchGear(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching gear data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> gear) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateGearPage(
          gearId: gear['id']?.toString() ?? '',
          name: gear['name'] ?? '',
          onUpdate: () {
            fetchGear();
          },
          fetchNewData: fetchGear,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gears'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchGear,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : GearList(
                gears: gears,
                onUpdate: (gear) {
                  showUpdatePage(gear);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddGearPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchGear();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

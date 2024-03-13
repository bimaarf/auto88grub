import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchFuel.dart';
import 'package:frontend/Pages/Components/Data/Master/Fuel/Context/__FuelList.dart';
import 'package:frontend/Pages/Components/Data/Master/Fuel/Context/__FuelStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Fuel/Context/__FuelUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FuelPage extends StatefulWidget {
  @override
  _FuelPageState createState() => _FuelPageState();
}

class _FuelPageState extends State<FuelPage> {
  List<Map<String, dynamic>> fuels = [];
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
    await fetchFuel(); // Await fetchFuel
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchFuel() async {
    try {
      setState(() {
        isLoading = true;
      });

      fuels = await ServiceFuel.fetchFuel(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching brand data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> brand) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateFuelPage(
          fuelId: brand['id']?.toString() ?? '',
          name: brand['name'] ?? '',
          onUpdate: () {
            fetchFuel();
          },
          fetchNewData: fetchFuel,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fuels'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchFuel,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : FuelList(
                fuels: fuels,
                onUpdate: (brand) {
                  showUpdatePage(brand);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddFuelPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchFuel();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

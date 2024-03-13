import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchBrankas.dart';
import 'package:frontend/Pages/Components/Data/Master/Brankas/Context/__BrankasList.dart';
import 'package:frontend/Pages/Components/Data/Master/Brankas/Context/__BrankasStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Brankas/Context/__BrankasUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BrankasPage extends StatefulWidget {
  @override
  _BrankasPageState createState() => _BrankasPageState();
}

class _BrankasPageState extends State<BrankasPage> {
  List<Map<String, dynamic>> brankas = [];
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
    await fetchBrankas(); // Await fetchBrankas
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchBrankas() async {
    try {
      setState(() {
        isLoading = true;
      });

      brankas = await ServiceBrankas.fetchBrankas(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching brankas data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> brankas) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateBrankasPage(
          brankasId: brankas['id']?.toString() ?? '',
          name: brankas['name'] ?? '',
          onUpdate: () {
            fetchBrankas();
          },
          fetchNewData: fetchBrankas,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Brankas'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchBrankas,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : BrankasList(
                brankas: brankas,
                onUpdate: (brankas) {
                  showUpdatePage(brankas);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddBrankasPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchBrankas();
            }
          });
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

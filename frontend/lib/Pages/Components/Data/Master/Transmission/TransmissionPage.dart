import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchTransmission.dart';
import 'package:frontend/Pages/Components/Data/Master/Transmission/Context/__TransmissionList.dart';
import 'package:frontend/Pages/Components/Data/Master/Transmission/Context/__TransmissionStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Transmission/Context/__TransmissionUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TransmissionPage extends StatefulWidget {
  @override
  _TransmissionPageState createState() => _TransmissionPageState();
}

class _TransmissionPageState extends State<TransmissionPage> {
  List<Map<String, dynamic>> transmissions = [];
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
    await fetchTransmission(); // Await fetchTransmission
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchTransmission() async {
    try {
      setState(() {
        isLoading = true;
      });

      transmissions = await ServiceTransmission.fetchTransmission(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching transmission data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> transmission) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateTransmissionPage(
          transmissionId: transmission['id']?.toString() ?? '',
          name: transmission['name'] ?? '',
          onUpdate: () {
            fetchTransmission();
          },
          fetchNewData: fetchTransmission,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transmissions'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchTransmission,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : TransmissionList(
                transmissions: transmissions,
                onUpdate: (transmission) {
                  showUpdatePage(transmission);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddTransmissionPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchTransmission();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

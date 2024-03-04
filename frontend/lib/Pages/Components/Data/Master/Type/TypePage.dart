import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchType.dart';
import 'package:frontend/Pages/Components/Data/Master/Type/Context/__TypeList.dart';
import 'package:frontend/Pages/Components/Data/Master/Type/Context/__TypeStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Type/Context/__TypeUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TypePage extends StatefulWidget {
  @override
  _TypePageState createState() => _TypePageState();
}

class _TypePageState extends State<TypePage> {
  List<Map<String, dynamic>> types = [];
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
    await fetchType(); // Await fetchType
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchType() async {
    try {
      setState(() {
        isLoading = true;
      });

      types = await ServiceType.fetchType(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching type data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(BuildContext context, Map<String, dynamic> type,
      List<Map<String, dynamic>> types) async {
    try {
      if (type.containsKey('id') &&
          type.containsKey('name') &&
          type.containsKey('brand') &&
          type.containsKey('model')) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => UpdateTypePage(
              typeId: type['id']?.toString() ?? '',
              name: type['name'] ?? '',
              brandId: type['brand']['id'].toString(),
              brandName: type['brand']['name'],
              brands:
                  types.map<Map<String, dynamic>>((e) => e['brand']).toList(),
              modelId: type['model']['id'].toString(),
              modelName: type['model']['name'],
              onUpdate: () {
                fetchType();
              },
              fetchNewData: fetchType,
            ),
          ),
        );
      } else {
        throw Exception("Model data is incomplete or malformed.");
      }
    } catch (e) {
      print('Error showing update page: $e');
      // Handle the error as needed
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Type'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchType,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : TypeList(
                types: types,
                onUpdate: (type) {
                  showUpdatePage(
                      context, type, types); // Pass context and types
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddTypePage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchType();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

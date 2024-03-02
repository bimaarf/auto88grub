import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchType.dart';
import 'package:frontend/Pages/Components/Data/Master/Model/Context/__ModelList.dart';
import 'package:frontend/Pages/Components/Data/Master/Type/Context/__TypeStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Type/Context/__TypeUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TypePage extends StatefulWidget {
  @override
  _TypePageState createState() => _TypePageState();
}

class _TypePageState extends State<TypePage> {
  List<Map<String, dynamic>> models = [];
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
    await fetchModel(); // Await fetchModel
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchModel() async {
    try {
      setState(() {
        isLoading = true;
      });

      models = await ServiceType.fetchType(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching model data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> model) async {
    try {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => UpdateTypePage(
            typeId: model['id']?.toString() ?? '',
            name: model['name'] ?? '',
            brandId: model['brand']['id'].toString(),
            brandName: model['brand']['name'],
            brands:
                models.map<Map<String, dynamic>>((e) => e['brand']).toList(),
            onUpdate: () {
              fetchModel();
            },
            fetchNewData: fetchModel,
          ),
        ),
      );
    } catch (e) {
      print('Error fetching brand data: $e');
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
        onRefresh: fetchModel,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : ModelList(
                models: models,
                onUpdate: (model) {
                  showUpdatePage(model);
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
              fetchModel();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

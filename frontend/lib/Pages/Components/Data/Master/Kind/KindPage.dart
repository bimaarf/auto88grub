import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchKind.dart';
import 'package:frontend/Pages/Components/Data/Master/Kind/Context/__KindList.dart';
import 'package:frontend/Pages/Components/Data/Master/Kind/Context/__KindStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Kind/Context/__KindUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class KindPage extends StatefulWidget {
  @override
  _KindPageState createState() => _KindPageState();
}

class _KindPageState extends State<KindPage> {
  List<Map<String, dynamic>> kinds = [];
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
    await fetchKind(); // Await fetchKind
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchKind() async {
    try {
      setState(() {
        isLoading = true;
      });

      kinds = await ServiceKind.fetchKind(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching kind data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> kind) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateKindPage(
          baseUrl: baseUrl,
          imageUrl: kind['image'],
          kindId: kind['id']?.toString() ?? '',
          name: kind['name'] ?? '',
          onUpdate: () {
            fetchKind();
          },
          fetchNewData: fetchKind,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('kinds'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchKind,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : KindList(
                baseUrl: baseUrl,
                kinds: kinds,
                onUpdate: (kind) {
                  showUpdatePage(kind);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddKindPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchKind();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

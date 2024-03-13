import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchColor.dart';
import 'package:frontend/Pages/Components/Data/Master/Color/Context/__ColorList.dart';
import 'package:frontend/Pages/Components/Data/Master/Color/Context/__ColorStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Color/Context/__ColorUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ColorPage extends StatefulWidget {
  @override
  _ColorPageState createState() => _ColorPageState();
}

class _ColorPageState extends State<ColorPage> {
  List<Map<String, dynamic>> colors = [];
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
    await fetchColor(); // Await fetchColor
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchColor() async {
    try {
      setState(() {
        isLoading = true;
      });

      colors = await ServiceColor.fetchColor(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching color data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> color) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateColorPage(
          colorId: color['id']?.toString() ?? '',
          name: color['name'] ?? '',
          onUpdate: () {
            fetchColor();
          },
          fetchNewData: fetchColor,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Colors'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchColor,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : ColorList(
                colors: colors,
                onUpdate: (color) {
                  showUpdatePage(color);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddColorPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchColor();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

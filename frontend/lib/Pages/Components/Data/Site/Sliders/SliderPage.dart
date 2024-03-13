import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/Site/fetchSlider.dart';
import 'package:frontend/Pages/Components/Data/Site/Sliders/Context/__SliderList.dart';
import 'package:frontend/Pages/Components/Data/Site/Sliders/Context/__SliderStore.dart';
import 'package:frontend/Pages/Components/Data/Site/Sliders/Context/__SliderUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SliderPage extends StatefulWidget {
  @override
  _SliderPageState createState() => _SliderPageState();
}

class _SliderPageState extends State<SliderPage> {
  List<Map<String, dynamic>> sliders = [];
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
    await fetchSlider(); // Await fetchSlider
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchSlider() async {
    try {
      setState(() {
        isLoading = true;
      });

      sliders = await ServiceSlider.fetchSlider(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching slider data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> slider) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateSliderPage(
          baseUrl: baseUrl,
          imageUrl: slider['image'],
          sliderId: slider['id']?.toString() ?? '',
          category: slider['category'] ?? '',
          onUpdate: () {
            fetchSlider();
          },
          fetchNewData: fetchSlider,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sliders'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchSlider,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : SliderList(
                baseUrl: baseUrl,
                sliders: sliders,
                onUpdate: (slider) {
                  showUpdatePage(slider);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddSliderPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchSlider();
            }
          });
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

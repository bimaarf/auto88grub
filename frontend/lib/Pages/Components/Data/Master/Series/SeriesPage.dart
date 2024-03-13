import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchSeries.dart';
import 'package:frontend/Pages/Components/Data/Master/Series/Context/__SeriesList.dart';
import 'package:frontend/Pages/Components/Data/Master/Series/Context/__SeriesStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Series/Context/__SeriesUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SeriesPage extends StatefulWidget {
  @override
  _SeriesPageState createState() => _SeriesPageState();
}

class _SeriesPageState extends State<SeriesPage> {
  List<Map<String, dynamic>> series = [];
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
    await fetchSeries();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchSeries() async {
    try {
      setState(() {
        isLoading = true;
      });

      series = await ServiceSeries.fetchSeries(baseUrl);

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
        builder: (context) => UpdateSeriesPage(
          seriesId: brand['id']?.toString() ?? '',
          name: brand['name'] ?? '',
          onUpdate: () {
            fetchSeries();
          },
          fetchNewData: fetchSeries,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('series'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchSeries,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : SeriesList(
                seriess: series,
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
              builder: (context) => AddSeriesPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchSeries();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

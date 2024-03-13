import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchBrand.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/Context/__BrandList.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/Context/__BrandStore.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/Context/__BrandUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BrandPage extends StatefulWidget {
  @override
  _BrandPageState createState() => _BrandPageState();
}

class _BrandPageState extends State<BrandPage> {
  List<Map<String, dynamic>> brands = [];
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
    await fetchBrand(); // Await fetchBrand
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchBrand() async {
    try {
      setState(() {
        isLoading = true;
      });

      brands = await ServiceBrand.fetchBrands(baseUrl);

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
        builder: (context) => UpdateBrandPage(
          brandId: brand['id']?.toString() ?? '',
          name: brand['name'] ?? '',
          onUpdate: () {
            fetchBrand();
          },
          fetchNewData: fetchBrand,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Brands'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchBrand,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : BrandList(
                brands: brands,
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
              builder: (context) => AddBrandPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchBrand();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetch API Example',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final String apiUrl =
      'http://bimarf.in/api/tweets?page=1&perPage=10'; // Ganti dengan URL API Anda

  Future<List<Map<String, dynamic>>> fetchData() async {
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      try {
        final dynamic jsonResponse = json.decode(response.body);

        if (jsonResponse.containsKey('data')) {
          final List<dynamic> responseData = jsonResponse['data'];

          // Konversi data ke dalam List<Map<String, dynamic>>
          final List<Map<String, dynamic>> dataList =
              responseData.cast<Map<String, dynamic>>();

          return dataList;
        } else {
          throw Exception('Invalid response data format: Missing "data" key');
        }
      } catch (e) {
        throw Exception('Error decoding response data: $e');
      }
    } else {
      throw Exception('Failed to load data: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Fetch API Example',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.black,
        centerTitle: true,
      ),
      body: Container(
        color: Colors.black,
        child: Center(
            child: RefreshIndicator(
          child: FutureBuilder(
            future: fetchData(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return CircularProgressIndicator();
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              } else if (snapshot.data == null || snapshot.data!.isEmpty) {
                return Text('No data available');
              } else {
                final List<Map<String, dynamic>> dataList =
                    snapshot.data as List<Map<String, dynamic>>;

                return ListView.builder(
                  itemCount: dataList.length,
                  itemBuilder: (context, index) {
                    final Map<String, dynamic> data = dataList[index];
                    return ListTile(
                      title: Text('Username: ${data['username']}'),
                      subtitle: Text('Tweet: ${data['tweet']}'),
                    );
                  },
                );
              }
            },
          ),
        )),
      ),
    );
  }
}

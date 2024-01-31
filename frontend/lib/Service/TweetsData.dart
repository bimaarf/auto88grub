import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flare_flutter/flare_actor.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyHomePage());
}

// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Fetch API',
//       home: MyHomePage(),
//     );
//   }
// }

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<String> items = List.generate(50, (index) => 'Item $index');

  final String apiUrl =
      'http://bimarf.in/api/tweets?page=1&perPage=10'; // Ganti dengan URL API Anda

  Future<List<Map<String, dynamic>>> fetchData() async {
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      try {
        final dynamic jsonResponse = json.decode(response.body);

        if (jsonResponse.containsKey('data')) {
          final List<dynamic> responseData = jsonResponse['data'];

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
      body: Container(
        color: Colors.black,
        child: Center(
          child: TweetsData(),
        ),
      ),
    );
  }

  RefreshIndicator TweetsData() {
    return RefreshIndicator(
      onRefresh: () async {
        await fetchData();
        setState(() {});
      },
      child: CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            backgroundColor: Colors.black,
            title: Text(
              'Auto Hide on Scroll',
              style: TextStyle(color: Colors.white),
            ),
            floating: true,
            snap: true,
          ),
          SliverToBoxAdapter(
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
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: dataList.length,
                    itemBuilder: (context, index) {
                      final Map<String, dynamic> data = dataList[index];
                      return GestureDetector(
                        onDoubleTap: () {
                          // Show love popup or perform any action
                          _showLovePopup(context, data['username']);
                        },
                        child: ListTile(
                          title: Row(
                            children: [
                              CircleAvatar(
                                backgroundImage: CachedNetworkImageProvider(
                                  'https://cdn.rri.co.id/berita/130/images/1697161161108-J/jxrjhffx0cf2ijy.jpeg',
                                ),
                              ),
                              SizedBox(
                                width: 8,
                              ),
                              Text(
                                data['username'],
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                              SizedBox(width: 3),
                              if (data['s_accounts'] != null)
                                Icon(
                                  Icons.verified,
                                  color: data['s_accounts'] == 'Administrator'
                                      ? Colors.red
                                      : Colors.blue,
                                  size: 18,
                                )
                            ],
                          ),
                          subtitle: Container(
                            decoration: BoxDecoration(
                              border: Border(
                                top: BorderSide(
                                  color: Colors.white,
                                  width: 0.5,
                                ),
                              ),
                            ),
                            margin: EdgeInsets.only(top: 10),
                            padding:
                                EdgeInsets.only(top: 10, left: 8, right: 8),
                            child: Text(
                              'Tweet: ${data['tweet']}',
                              style: TextStyle(color: Colors.white70),
                            ),
                          ),
                        ),
                      );
                    },
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  void _showLovePopup(BuildContext context, String username) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.black
              .withOpacity(0.6), // Set the background color with opacity
          title: Text('Love Popup',
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w700)),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Close', style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );
  }
}

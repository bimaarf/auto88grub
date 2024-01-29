import 'package:flutter/material.dart';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:frontend/Model/api_service.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<Tweets>> _tweets;

  @override
  void initState() {
    super.initState();
    _tweets = ApiService().fetchTweets();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Flutter 🙌',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.black,
      ),
      body: Container(
          color: Colors.black, // Set your desired background color here
          child: FutureBuilder<List<Tweets>>(
            future: _tweets,
            builder: (context, snapshot) {
              if (snapshot.hasError) {
                return Center(
                  child: Text('Error: ${snapshot.error}'),
                );
              } else if (snapshot.hasData) {
                final tweets = snapshot.data!;
                return ListView.builder(
                  itemCount: tweets.length,
                  itemBuilder: (context, index) {
                    final tweets = tweets[index];
                    return ListTile(
                      subtitle: Text(
                        tweets.username,
                      ),
                      title: Text(tweets.tweets),
                    );
                  },
                );
              } else {
                return Center(
                  child: CircularProgressIndicator(),
                );
              }
            },
          )),
    );
  }
}

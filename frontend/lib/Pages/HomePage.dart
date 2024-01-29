import 'package:flutter/material.dart';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:frontend/Model/api_service.dart';

class HomePage extends StatefulWidget {
  // ignore: use_key_in_widget_constructors
  const HomePage({super.key});

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
        title: Text('Fetch API Example'),
      ),
      body: FutureBuilder<List<Tweets>>(
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
                final tweet = tweets[index];
                return ListTile(
                  title: Text(tweet.username),
                  subtitle: Text(tweet.tweets),
                );
              },
            );
          } else {
            return Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
    );
  }
}

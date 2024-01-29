import 'package:flutter/material.dart';
import 'package:frontend/Model/ModelTweets.dart';
import 'package:frontend/Service/TweetService.dart';

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Tweet> _tweets = [];

  @override
  void initState() {
    super.initState();
    fetchTweets();
  }

  Future<void> fetchTweets() async {
    try {
      final tweets = await TweetService.fetchTweets();
      setState(() {
        _tweets = tweets;
      });
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: _tweets.isEmpty
          ? Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: _tweets.length,
              itemBuilder: (context, index) {
                final tweet = _tweets[index];
                return ListTile(
                  title: Text(tweet.text),
                  subtitle: Text('User ID: ${tweet.userId}'),
                );
              },
            ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:frontend/Pages/HomePage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetch API Example',
      home: HomePage(title: 'Tweet App'),
    );
  }
}

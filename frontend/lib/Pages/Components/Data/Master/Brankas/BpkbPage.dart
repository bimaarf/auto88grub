import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brankas/BpkbList.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BpkbPage extends StatefulWidget {
  const BpkbPage();

  @override
  State<BpkbPage> createState() => _BpkbPageState();
}

class _BpkbPageState extends State<BpkbPage> {
  late String token;
  late String email;
  late String username;
  late String roles;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    loadUserData();
  }

  Future<void> loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      token = prefs.getString('token') ?? '';
      email = prefs.getString('email') ?? '';
      username = prefs.getString('name') ?? '';
      roles = prefs.getString('roles') ?? '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lokasi Brankas'),
        backgroundColor: Colors.black,
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Notifications'),
                    content: const Text('Notification settings here.'),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Close'),
                      ),
                    ],
                  );
                },
              );
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Settings'),
                    content: const Text('App settings here.'),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Close'),
                      ),
                    ],
                  );
                },
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              height:
                  MediaQuery.of(context).size.height, // Provide a finite height
              child: const BrankasList(),
            ),
          ],
        ),
      ),
    );
  }
}

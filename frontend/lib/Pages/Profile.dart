import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final String profileName;

  const ProfileScreen({required this.profileName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.only(top: 30),
            width: double.infinity,
            decoration: BoxDecoration(
              border: Border(
                  top: BorderSide(
                      width: 1, color: Colors.white.withOpacity(0.1))),
              gradient: LinearGradient(
                colors: [Colors.blue.shade500, Colors.blue.shade800],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              color: Colors.blue.withOpacity(0.9),
            ),
            child: Container(
              margin: const EdgeInsets.all(10),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Wrap(
                    alignment: WrapAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.account_circle_rounded,
                                color: Colors.white,
                                size: 40,
                              ),
                              Text(
                                'Adm. Name',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.notifications,
                                color: Colors.white,
                                size: 25,
                              ),
                              SizedBox(width: 10), // Adjust the width as needed
                              Icon(
                                Icons.chat,
                                color: Colors.white,
                                size: 25,
                              ),
                              SizedBox(width: 10), // Adjust the width as needed
                              Icon(
                                Icons.settings,
                                color: Colors.white,
                                size: 25,
                              ),
                            ],
                          )
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Container(
            color: Colors.white,
            margin: const EdgeInsets.all(10),
            width: double.infinity,
            child: SingleChildScrollView(
              // Change the scroll direction to horizontal
              scrollDirection: Axis.horizontal,
              child: Row(
                // Align the children in the center
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Colors.blueAccent.shade200,
                          Colors.blueAccent.shade200,
                        ],
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Icon(
                      Icons.abc,
                      color: Colors.white,
                      size: 24,
                    ),
                  ),
                  SizedBox(width: 10), // Add space between icon and text
                  // Adjust padding for better spacing
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 5),
                    child: Text(
                      'Label',
                      style: TextStyle(
                        color: Colors.black87,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      )),
    );
  }
}

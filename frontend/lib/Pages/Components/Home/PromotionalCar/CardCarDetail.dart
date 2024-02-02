import 'package:flutter/material.dart';

class CardCarDetail extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String subtitle;
  final String note;

  const CardCarDetail({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.note,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Other Scaffold content...
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.only(top: 30),
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.blue.shade500, Colors.blue.shade800],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            color: Colors.blue.withOpacity(0.9),
          ),
          child: Container(
            margin: const EdgeInsets.all(10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                GestureDetector(
                  child: Material(
                    color: Colors.transparent,
                    child: InkResponse(
                      onTap: () {
                        // Handle the tap
                      },
                      splashColor: Colors.white
                          .withOpacity(0.5), // Customize the splash color
                      highlightShape: BoxShape.rectangle,
                      containedInkWell: true,
                      borderRadius: BorderRadius.circular(10.3),
                      child: const Column(
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
                          // Container(
                          //   margin: const EdgeInsets.only(top: 10),
                          //   child: const Row(
                          //     crossAxisAlignment: CrossAxisAlignment.center,
                          //     children: [
                          //       Icon(
                          //         Icons.account_circle_rounded,
                          //         color: Colors.white,
                          //         size: 40,
                          //       ),
                          //       Text(
                          //         'Adm. Name',
                          //         style: TextStyle(
                          //             color: Colors.white,
                          //             fontSize: 17,
                          //             fontWeight: FontWeight.bold),
                          //       ),
                          //     ],
                          //   ),
                          // ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

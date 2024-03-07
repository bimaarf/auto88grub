import 'package:flutter/material.dart';

class QuestionList extends StatelessWidget {
  final List<Map<String, dynamic>> questions;
  final Function(Map<String, dynamic>) onUpdate;

  const QuestionList(
      {Key? key, required this.questions, required this.onUpdate})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: questions.length,
      itemBuilder: (context, index) {
        final model = questions[index];
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.white10))),
          child: ListTile(
            title: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  model['name'].toUpperCase(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 15),
                ),
                Text(
                  model['created_at'].toUpperCase(),
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            trailing: const Icon(Icons.brush),
            onTap: () {
              onUpdate(model);
            },
          ),
        );
      },
    );
  }
}

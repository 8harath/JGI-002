#include <stdio.h>
#include <conio.h>
struct Student {
 char name[50];
 int rollNumber;
 float marks;

};
int main() {
 struct Student student;
 printf("Enter student name: ");
 scanf("%s", student.name);
 printf("Enter student roll number: ");
 scanf("%d", &student.rollNumber);
 printf("Enter student marks: ");
 scanf("%f", &student.marks);
 printf("\nStudent Information form:\n");
 printf("Name: %s\n", student.name);
 printf("Roll Number: %d\n", student.rollNumber);
 printf("Marks: %.2f\n", student.marks);
 getch();
 return 0;
}

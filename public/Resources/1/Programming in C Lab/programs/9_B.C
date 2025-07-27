#include <stdio.h>
#include <conio.h>
void calculateCircleProperties(float radius, float *area, float *circumference) {
    *area = 3.14 * radius * radius;
    *circumference = 2 * 3.14 * radius;
}

int main() {
    float radius, area, circumference;

    clrscr();
    printf("Enter the radius of the circle: ");
    scanf("%f", &radius);


    calculateCircleProperties(radius, &area, &circumference);


    printf("Area of the circle: %.2f\n", area);
    printf("Circumference of the circle: %.2f\n", circumference);
    getch();
    return 0;
}

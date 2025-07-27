#include<stdio.h>
#include<conio.h>
int main()
{
    char inputString[100];
    int length;
    clrscr();
    printf("Enter a string: ");
    scanf("%s", inputString);
    
    length = strlen(inputString);
    printf("Length of the string: %d\n", length);

getch();
return 0;
}
#include<stdio.h>
#include<conio.h>
#include<string.h>
int main()
{
char str1[50] = "hiii";
char str2[] = "_bharath" ;
clrscr();
strcat(str1, str2);
printf("Concatended string: %s\n", str1);
getch();
return 0;
}
#include <stdio.h>
#include <conio.h>
int main()
{
    FILE *fptr;
    char text[50];

    fptr = fopen("Upper.txt", "w");

    if (fptr == NULL)
    {
	printf("\n File does not exist.\n");
	return 1;
    }
    printf("\n Enter the Mixed Case String:\n");
    gets(text);
    printf("\n Upper Text: %s", strupr(text));
    fprintf(fptr, "\n Converted Upper Text  = %s\n", strupr(text));
    printf("\n Lower Text: %s", strlwr(text));
    fprintf(fptr, "\n Converted Lower Text = %s\n", strlwr(text));
    fclose(fptr);
    getch ();
    return 0;
}
using System.Diagnostics;
using System.Runtime.InteropServices;
using WiimoteLib;
using static System.Windows.Forms.AxHost;

namespace wiimote_form
{
    public partial class Form1 : Form
    {

        Wiimote wiimote;
        const int OCTAVES = 6;

        const double IR_X_RANGE = 1023.0;
        const double IR_Y_RANGE = 767.0;

        static int currentOctave = 0;
        static int nextOctave = 0;

        [StructLayout(LayoutKind.Sequential)]
        public struct POINT
        {
            public int X;
            public int Y;
        }

        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool GetCursorPos(out POINT lpPoint);

        [DllImport("user32.dll", EntryPoint = "SetCursorPos")]
        private static extern bool SetCursorPos(int x, int y);

        public Form1()
        {
            InitializeComponent();

            // Create a new Wiimote object
            wiimote = new Wiimote();

            // Set up event handlers for Wiimote events
            wiimote.WiimoteChanged += new EventHandler<WiimoteChangedEventArgs>(wiimote_WiimoteChanged);

            // Connect to the Wiimote
            wiimote.Connect();

            // Set report type to receive button data
            wiimote.SetReportType(InputReport.Buttons, true);
            wiimote.SetReportType(InputReport.IRAccel, true);
            wiimote.WiimoteState.IRState.Mode = IRMode.Extended;

        }

        private int height = Screen.PrimaryScreen.Bounds.Height;
        private int width = Screen.PrimaryScreen.Bounds.Width;

        void wiimote_WiimoteChanged(object sender, WiimoteChangedEventArgs e)
        {
            var B = e.WiimoteState.ButtonState.B;
            var left = e.WiimoteState.ButtonState.Left;
            var right = e.WiimoteState.ButtonState.Right;

            var accelY = e.WiimoteState.AccelState.Values.Y;
            if (e.WiimoteState.IRState.IRSensors.Length > 0)
            {
                IRSensor irSensor = e.WiimoteState.IRState.IRSensors[0];
                Console.WriteLine(irSensor.ToString());
                if (irSensor.Found)
                {
                    int X;
                    int Y;

                    int irX = irSensor.RawPosition.X;
                    int irY = irSensor.RawPosition.Y;
                    Y = (int)(((double)irY / IR_Y_RANGE) * height);

                    int mouseX = B 
                        ? width - (int)(((double)irX / IR_X_RANGE) * width)
                        : MousePosition.X;

                    if (currentOctave == nextOctave)
                    {
                        if (left) nextOctave--;
                        if (right) nextOctave++;
                    }

                    if (nextOctave >= OCTAVES)
                    {
                        nextOctave = OCTAVES - 1;
                    } 
                    else if (nextOctave < 0)
                    {
                        nextOctave = 0;
                    }

                    if (nextOctave != currentOctave)
                    {
                        X = MousePosition.X + (nextOctave - currentOctave) * 20;

                        int completionX = (int)((nextOctave / (double)OCTAVES) * width) + (width / (OCTAVES * 2));

                        if (nextOctave > currentOctave && X >= completionX 
                            || nextOctave < currentOctave && X <= completionX)
                        {
                            currentOctave = nextOctave;
                        }
                    }
                    else
                    {
                        X = (int)((currentOctave / (double)OCTAVES) * width) + (width / (OCTAVES * 2));
                    }

                    txtDebug.Text = currentOctave.ToString();

                    SetCursorPos(X, Y);
                }
            }
            //if (B)
            //{
            //    var height = Screen.PrimaryScreen.Bounds.Height;
            //    POINT point;
            //    GetCursorPos(out point);


            //    move by gyro sensor(continuous)
            //    var newY = ((accelY + 1) / 2) * height;
            //    if (newY < 0) newY = 0;
            //    else if (newY > height) newY = height;
            //    SetCursorPos(MousePosition.X, (int)newY);

            //    move by gyro sensor(to nearest half note)
            //    var newYRounded = (int)(((Math.Floor((accelY + 1) / 2 * 12) + 0.5) / 12) * height);
            //    var newY = ((accelY + 1) / 2) * height;
            //    if (newYRounded < 0) newYRounded = 0;
            //    else if (newYRounded > height) newYRounded = height;
            //    if (Math.Abs(newY - newYRounded) < 40)
            //        SetCursorPos(MousePosition.X, newYRounded);
            //    txtDebug.Text = newYRounded.ToString();
            //}
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}

using System.Diagnostics;
using System.Runtime.InteropServices;
using WiimoteLib;

namespace wiimote_form
{
    public partial class Form1 : Form
    {

        Wiimote wiimote;

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
        }

        void wiimote_WiimoteChanged(object sender, WiimoteChangedEventArgs e)
        {
            var B = e.WiimoteState.ButtonState.B;
            var accelY = e.WiimoteState.AccelState.Values.Y;
            if (B)
            {
                var height = Screen.PrimaryScreen.Bounds.Height;
                POINT point;
                GetCursorPos(out point);

                var newYRounded = (int)(((Math.Floor((accelY + 1) / 2 * 12) + 0.5) / 12) * height);
                var newY = ((accelY + 1) / 2) * height;
                if (newYRounded < 0) newYRounded = 0;
                else if (newYRounded > height) newYRounded = height;
                if (Math.Abs(newY - newYRounded) < 40)
                    SetCursorPos(MousePosition.X, newYRounded);
                txtDebug.Text = newYRounded.ToString();
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}

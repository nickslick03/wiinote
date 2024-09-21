using System.Diagnostics;
using System.Runtime.InteropServices;
using WiimoteLib;
using static System.Windows.Forms.AxHost;
using System.Windows.Forms;
using System.Security.Policy;

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

        static bool isMouseDown = false;
        static bool isADown = false;

        int octaveSpeed = 20;

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

        [DllImport("user32.dll", SetLastError = true)]
        static extern void mouse_event(uint dwFlags, int dx, int dy, uint dwData, int dwExtraInfo);

        [DllImport("user32.dll")]
        static extern void SendInput(uint nInputs, [In] INPUT[] pInputs, int cbSize);

        private const uint MOUSEEVENTF_LEFTDOWN = 0x0002;
        private const uint MOUSEEVENTF_LEFTUP = 0x0004;

        [StructLayout(LayoutKind.Sequential)]
        public struct INPUT
        {
            public uint type;
            public MOUSEINPUT mi;
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct MOUSEINPUT
        {
            public int dx;
            public int dy;
            public uint mouseData;
            public uint dwFlags;
            public uint time;
            public IntPtr dwExtraInfo;
        }

        public const uint INPUT_MOUSE = 0;
        public const uint INPUT_KEYBOARD = 1;
        public const uint INPUT_HARDWARE = 2;

        public static void TriggerMouseDown()
        {
            INPUT[] inputs = new INPUT[1];
            inputs[0].type = INPUT_MOUSE;
            inputs[0].mi.dx = 0;
            inputs[0].mi.dy = 0;
            inputs[0].mi.mouseData = 0;
            inputs[0].mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
            inputs[0].mi.time = 0;
            inputs[0].mi.dwExtraInfo = IntPtr.Zero;

            SendInput(1, inputs, Marshal.SizeOf(typeof(INPUT)));
        }

        public static void TriggerMouseUp()
        {
            INPUT[] inputs = new INPUT[1];
            inputs[0].type = INPUT_MOUSE;
            inputs[0].mi.dx = 0;
            inputs[0].mi.dy = 0;
            inputs[0].mi.mouseData = 0;
            inputs[0].mi.dwFlags = MOUSEEVENTF_LEFTUP;
            inputs[0].mi.time = 0;
            inputs[0].mi.dwExtraInfo = IntPtr.Zero;

            SendInput(1, inputs, Marshal.SizeOf(typeof(INPUT)));
        }

        public Form1()
        {
            InitializeComponent();

            // Create a new Wiimote object
            wiimote = new Wiimote();

            // Set up event handlers for Wiimote events
            wiimote.WiimoteChanged += new EventHandler<WiimoteChangedEventArgs>(wiimote_WiimoteChanged);

            try
            {
                // Connect to the Wiimote
                wiimote.Connect();

                // Set report type to receive button data
                wiimote.SetReportType(InputReport.Buttons, true);
                wiimote.SetReportType(InputReport.IRAccel, true);
                wiimote.WiimoteState.IRState.Mode = IRMode.Extended;
                settingsBox.Visible = true;
                octaveSpeedTextbox.Text = octaveSpeed.ToString();
            }
            catch (Exception ex)
            {
                errorLabel.Visible = true;
            }

        }

        private int height = Screen.PrimaryScreen.Bounds.Height;
        private int width = Screen.PrimaryScreen.Bounds.Width;

        void wiimote_WiimoteChanged(object sender, WiimoteChangedEventArgs e)
        {
            var A = e.WiimoteState.ButtonState.A;
            var B = e.WiimoteState.ButtonState.B;
            var left = e.WiimoteState.ButtonState.Left;
            var right = e.WiimoteState.ButtonState.Right;

            var accelY = e.WiimoteState.AccelState.Values.Y;
            if (e.WiimoteState.IRState.IRSensors.Length > 0)
            {
                IRSensor irSensor = e.WiimoteState.IRState.IRSensors[0];
                if (irSensor.Found)
                {
                    int X;
                    int Y;

                    int irY = irSensor.RawPosition.Y;
                    Y = (int)(((double)irY / IR_Y_RANGE) * height);

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
                        X = MousePosition.X + (nextOctave - currentOctave) * octaveSpeed;

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

                    SetCursorPos(X, Y);
                }

                
            }
            if (A && !isADown)
            {
                SendKeys.SendWait("a");
                isADown = true;
            }
            else if (!A && isADown)
            {
                SendKeys.SendWait("a");
                isADown = false;
            }

            if (B && !isMouseDown)
            {
                TriggerMouseDown();
                isMouseDown = true;
            }
            else if (!B && isMouseDown)
            {
                TriggerMouseUp();
                isMouseDown = false;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void wiinoteWebpageLink_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://nickslick03.github.io/wiinote/",
                UseShellExecute = true
            });
        }

        private void errorLabel_Click(object sender, EventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://sites.google.com/site/wiinupro/downloads?authuser=0",
                UseShellExecute = true
            });
        }

        private void octaveSpeedTextbox_TextChanged(object sender, EventArgs e)
        {
            string text = octaveSpeedTextbox.Text;
            try
            {
                int newSpeed = int.Parse(text);
                if (newSpeed <= 0 || newSpeed > 100)
                {
                    throw new Exception();
                }
                octaveSpeed = newSpeed;
                octaveSpeedTextbox.BackColor = Color.White;
            }
            catch (Exception ex) 
            {
                octaveSpeed = 20;
                octaveSpeedTextbox.BackColor = Color.Red;

            }
        }
    }
}

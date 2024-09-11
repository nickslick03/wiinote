using System.Runtime.InteropServices;
using WiimoteLib;

namespace wiimote_form
{
    partial class Form1
    {

        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            wiinoteWebpageLink = new LinkLabel();
            linkLabel1 = new LinkLabel();
            errorLabel = new Label();
            settingsBox = new GroupBox();
            octaveSpeedTextbox = new TextBox();
            label2 = new Label();
            settingsBox.SuspendLayout();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 18F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label1.Location = new System.Drawing.Point(228, 9);
            label1.Name = "label1";
            label1.Size = new Size(325, 41);
            label1.TabIndex = 1;
            label1.Text = "Wiinote Control Form";
            // 
            // wiinoteWebpageLink
            // 
            wiinoteWebpageLink.AutoSize = true;
            wiinoteWebpageLink.Location = new System.Drawing.Point(308, 72);
            wiinoteWebpageLink.Name = "wiinoteWebpageLink";
            wiinoteWebpageLink.Size = new Size(169, 20);
            wiinoteWebpageLink.TabIndex = 2;
            wiinoteWebpageLink.TabStop = true;
            wiinoteWebpageLink.Text = "Open Wiinote Webpage";
            wiinoteWebpageLink.LinkClicked += wiinoteWebpageLink_LinkClicked;
            // 
            // linkLabel1
            // 
            linkLabel1.AutoSize = true;
            linkLabel1.Location = new System.Drawing.Point(477, 72);
            linkLabel1.Name = "linkLabel1";
            linkLabel1.Size = new Size(0, 20);
            linkLabel1.TabIndex = 3;
            // 
            // errorLabel
            // 
            errorLabel.AccessibleRole = AccessibleRole.Link;
            errorLabel.ForeColor = Color.Red;
            errorLabel.Location = new System.Drawing.Point(191, 372);
            errorLabel.Name = "errorLabel";
            errorLabel.Size = new Size(416, 69);
            errorLabel.TabIndex = 4;
            errorLabel.Text = "The Wii remote could not be identified. If you do not have a Wii remote connected, click HERE to download Wiinusoft, Connect the Wii remote, and restart this program.";
            errorLabel.TextAlign = ContentAlignment.TopCenter;
            errorLabel.Visible = false;
            errorLabel.Click += errorLabel_Click;
            // 
            // settingsBox
            // 
            settingsBox.Controls.Add(octaveSpeedTextbox);
            settingsBox.Controls.Add(label2);
            settingsBox.Location = new System.Drawing.Point(228, 113);
            settingsBox.Name = "settingsBox";
            settingsBox.Size = new Size(325, 217);
            settingsBox.TabIndex = 5;
            settingsBox.TabStop = false;
            settingsBox.Text = "Settings";
            settingsBox.Visible = false;
            // 
            // octaveSpeedTextbox
            // 
            octaveSpeedTextbox.Location = new System.Drawing.Point(187, 38);
            octaveSpeedTextbox.Name = "octaveSpeedTextbox";
            octaveSpeedTextbox.Size = new Size(132, 27);
            octaveSpeedTextbox.TabIndex = 0;
            octaveSpeedTextbox.TextChanged += octaveSpeedTextbox_TextChanged;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new System.Drawing.Point(6, 41);
            label2.Name = "label2";
            label2.Size = new Size(175, 20);
            label2.TabIndex = 0;
            label2.Text = "octave movement speed:";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(settingsBox);
            Controls.Add(errorLabel);
            Controls.Add(linkLabel1);
            Controls.Add(wiinoteWebpageLink);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Form1";
            settingsBox.ResumeLayout(false);
            settingsBox.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Label label1;
        private LinkLabel wiinoteWebpageLink;
        private LinkLabel linkLabel1;
        private Label errorLabel;
        private GroupBox settingsBox;
        private Label label2;
        private TextBox octaveSpeedTextbox;
    }
}
